import { createCategoryAction } from "@/admin/_actions/createCategory";

function parseVariantsFromFormData(formData: FormData) {
  const variantMap = new Map<number, { name?: string; values: string[] }>();

  for (const [rawKey, rawValue] of formData.entries()) {
    const value = String(rawValue);

    // variant name like: variants[0].name
    const nameMatch = rawKey.match(/^variants\[(\d+)\]\.name$/);
    // values like: variants[0].value[0]  OR variants[0].value[0].value
    const valueMatch = rawKey.match(/^variants\[(\d+)\]\.value(?:\[(\d+)\])?(?:\.value)?$/);
    // also support variants[0].value0 style just in case
    const altValueMatch = rawKey.match(/^variants\[(\d+)\]\.value\[(\d+)\](?:\.value)?$/);

    if (nameMatch) {
      const idx = Number(nameMatch[1]);
      const entry = variantMap.get(idx) ?? { values: [] };
      entry.name = value;
      variantMap.set(idx, entry);
    } else if (valueMatch) {
      const idx = Number(valueMatch[1]);
      const valIdx = valueMatch[2] !== undefined ? Number(valueMatch[2]) : undefined;
      const entry = variantMap.get(idx) ?? { values: [] };
      if (valIdx === undefined) {
        // push if index not present
        entry.values.push(value);
      } else {
        entry.values[valIdx] = value;
      }
      variantMap.set(idx, entry);
    } else if (altValueMatch) {
      const idx = Number(altValueMatch[1]);
      const valIdx = Number(altValueMatch[2]);
      const entry = variantMap.get(idx) ?? { values: [] };
      entry.values[valIdx] = value;
      variantMap.set(idx, entry);
    }
  }

  // Convert to array and clean up holes (ensure values are compact arrays)
  const variants = Array.from(variantMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => ({
      name: v.name?.trim() ?? "",
      values: (v.values || []).filter((x) => x !== undefined && x !== null && String(x).trim() !== "").map(String),
    }))
    .filter((v) => v.name || v.values.length > 0); // drop empty variants

  return variants.length ? variants : undefined;
}

function parseVariantsFromUrlEncoded(params: URLSearchParams) {
  const variantMap = new Map<number, { name?: string; values: string[] }>();

  for (const [key, value] of params.entries()) {
    if (!key.startsWith("variants[")) continue;
    const nameMatch = key.match(/^variants\[(\d+)\]\.name$/);
    const valueMatch = key.match(/^variants\[(\d+)\]\.value(?:\[(\d+)\])?(?:\.value)?$/);
    if (nameMatch) {
      const idx = Number(nameMatch[1]);
      const entry = variantMap.get(idx) ?? { values: [] };
      entry.name = value;
      variantMap.set(idx, entry);
    } else if (valueMatch) {
      const idx = Number(valueMatch[1]);
      const valIdx = valueMatch[2] !== undefined ? Number(valueMatch[2]) : undefined;
      const entry = variantMap.get(idx) ?? { values: [] };
      if (valIdx === undefined) entry.values.push(value);
      else entry.values[valIdx] = value;
      variantMap.set(idx, entry);
    }
  }

  const variants = Array.from(variantMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => ({
      name: v.name?.trim() ?? "",
      values: (v.values || []).filter((x) => x !== undefined && String(x).trim() !== "").map(String),
    }))
    .filter((v) => v.name || v.values.length > 0);

  return variants.length ? variants : undefined;
}

export async function POST(req: Request) {
  const contentType = (req.headers.get("content-type") || "").toLowerCase();

  try {
    // 1) JSON payload
    if (contentType.includes("application/json")) {
      const json = await req.json();

      // normalize images: if images provided as base64/URLs in JSON, pass through
      const payload = {
        name: json.name,
        description: json.description,
        // Accept either an array already shaped or undefined
        variants: Array.isArray(json.variants) ? json.variants : undefined,
        images: Array.isArray(json.images) ? json.images : undefined,
      };

      const result = await createCategoryAction(payload as any);
      return Response.json(result);
    }

    // 2) multipart/form-data
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      // Basic required field check
      const name = formData.get("name") ? String(formData.get("name")) : undefined;
      if (!name || name.trim() === "") {
        return Response.json({ success: false, error: "Field 'name' is required" }, { status: 400 });
      }

      // Attempt to parse variants provided as a JSON string field first
      let variants = undefined;
      const rawVariants = formData.get("variants");
      if (rawVariants) {
        try {
          const maybe = typeof rawVariants === "string" ? JSON.parse(rawVariants) : rawVariants;
          if (Array.isArray(maybe)) variants = maybe;
        } catch {
          // ignore JSON parse error and fall back to bracketed parsing below
          variants = undefined;
        }
      }

      // If not parsed via JSON, parse bracketed keys like variants[0].name
      if (!variants) {
        variants = parseVariantsFromFormData(formData);
      }

      // files for 'images' (may be multiple)
      const images = formData.getAll("images").filter(Boolean) as File[];

      const body = {
        name: name.trim(),
        description: formData.get("description") ? String(formData.get("description")).trim() : undefined,
        variants,
        images,
      };

      console.log("🧩 Received FormData payload:", {
        name: body.name,
        description: body.description,
        variantCount: variants ? variants.length : 0,
        imageCount: images.length,
      });

      const result = await createCategoryAction(body as any);
      return Response.json(result);
    }

    // 3) application/x-www-form-urlencoded
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);

      const name = params.get("name") || undefined;
      if (!name || name.trim() === "") {
        return Response.json({ success: false, error: "Field 'name' is required" }, { status: 400 });
      }

      // variants: try JSON first, otherwise parse bracket style
      let variants = undefined;
      const rawVariants = params.get("variants");
      if (rawVariants) {
        try {
          const maybe = JSON.parse(rawVariants);
          if (Array.isArray(maybe)) variants = maybe;
        } catch {
          variants = undefined;
        }
      }
      if (!variants) {
        variants = parseVariantsFromUrlEncoded(params);
      }

      const body = {
        name: name.trim(),
        description: params.get("description") ? params.get("description")!.trim() : undefined,
        variants,
        images: undefined, // no files with urlencoded
      };

      console.log("🧩 Received urlencoded payload:", { name: body.name, variantsCount: variants ?? 0 });
      const result = await createCategoryAction(body as any);
      return Response.json(result);
    }

    return new Response(JSON.stringify({ success: false, error: "Unsupported Content-Type" }), { status: 415, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("❌ Error in category route:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
