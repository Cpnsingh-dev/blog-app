import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises';
import { NextResponse } from "next/server";
const fs = require('fs');

export async function GET(request) {
    try {
        await ConnectDB();

        const blogId = request.nextUrl.searchParams.get("id");
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, blog });
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ success: true, blogs });
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await ConnectDB();

        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || typeof image === 'string') {
            return NextResponse.json({ success: false, msg: "Please select an image file" }, { status: 400 });
        }

        const timeStamp = Date.now();
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;
        await writeFile(path, buffer);

        const imageUrl = `/${timeStamp}_${image.name}`;
        const authorImg = formData.get('authorImg') || formData.get('author_img') || '/author_img.png';

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imageUrl}`,
            authorImg: `${authorImg}`
        }

        await BlogModel.create(blogData);
        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}

//api to delete blogs
export async function DELETE(request) {
    try {
        await ConnectDB();
        const id = await request.nextUrl.searchParams.get("id");
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }
        fs.unlink(`./public/${blog.image}`, () => { });
        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Blog Deleted" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}

