"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, X } from "lucide-react";
import { updateCategory } from "../../../_actions/categoryAction";
import Image from "next/image";

interface EditCategoryFormProps {
  category: any;
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: category.name || "",
    description: category.description || "",
    categoryType: category.categoryType || "",
  });

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [sampleImages, setSampleImages] = useState<File[]>([]);
  
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [samplePreviews, setSamplePreviews] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSampleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSampleImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setSamplePreviews(prev => [...prev, ...previews]);
  };

  const removeSampleImage = (index: number) => {
    setSamplePreviews(prev => prev.filter((_, i) => i !== index));
    setSampleImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        bannerImage: bannerImage,
        categorySampleImage: sampleImages,
      };

      const result = await updateCategory(category.id, submitData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/categories");
          router.refresh();
        }, 1500);
      } else {
        setError(result.error || "Failed to update category");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error updating category:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Category Updated Successfully!</h3>
        <p className="text-muted-foreground">Redirecting to categories list...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryType">Category Type *</Label>
            <Select
              value={formData.categoryType}
              onValueChange={(value) => handleInputChange("categoryType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLOTHING">Clothing</SelectItem>
                <SelectItem value="FOOTWEAR">Footwear</SelectItem>
                <SelectItem value="ACCESSORY">Accessory</SelectItem>
                <SelectItem value="BAG">Bag</SelectItem>
                <SelectItem value="OUTERWEAR">Outerwear</SelectItem>
                <SelectItem value="WATCH">Watch</SelectItem>
                <SelectItem value="UNDERWEAR">Underwear</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Banner Image */}
      <Card>
        <CardHeader>
          <CardTitle>Banner Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bannerImage">Upload New Banner Image</Label>
            <Input
              id="bannerImage"
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Current Banner */}
            {category.bannerImage && !bannerPreview && (
              <div className="relative">
                <Image
                  src={category.bannerImage.url}
                  alt={`${category.name} banner`}
                  width={200}
                  height={120}
                  className="object-cover border rounded-lg"
                />
                <span className="text-xs text-muted-foreground mt-1 block">Current Banner</span>
              </div>
            )}

            {/* New Banner Preview */}
            {bannerPreview && (
              <div className="relative">
                <Image
                  src={bannerPreview}
                  alt="New banner preview"
                  width={200}
                  height={120}
                  className="object-cover border rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                  onClick={() => {
                    setBannerImage(null);
                    setBannerPreview(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground mt-1 block">New Banner</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample Images */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sampleImages">Upload New Sample Images</Label>
            <Input
              id="sampleImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleSampleImagesChange}
            />
          </div>

          {/* Current Sample Images */}
          {category.sampleImages && category.sampleImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Current Sample Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.sampleImages.map((image: any, index: number) => (
                  <div key={index} className="relative">
                    <Image
                      src={image.url}
                      alt={`Sample ${index + 1}`}
                      width={120}
                      height={120}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Sample Image Previews */}
          {samplePreviews.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">New Sample Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {samplePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={preview}
                      alt={`Sample preview ${index + 1}`}
                      width={120}
                      height={120}
                      className="object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeSampleImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Category
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
