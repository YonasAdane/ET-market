"use server"
import { UploadApiResponse } from 'cloudinary';
import cloudinary from './cloudinary';

export async function uploadToCloudinary(file: File, path: string): Promise<UploadApiResponse> {
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer)

    return await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream(
            { folder: `ET-market/${path}`, resource_type: "image" },
            function (error,result){
                if(error){
                    reject(error)
                    return;
                }
                resolve(result as UploadApiResponse);
            }).end(buffer)
    })
}
