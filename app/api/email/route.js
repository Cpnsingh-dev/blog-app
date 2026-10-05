import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    ConnectDB();
}

LoadDB();

export async function POST(request) {
    try {
        const formData = await request.formData();
        const emailData = { email: `${formData.get("email")}`, };
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Added" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: error.message });
    }
}

export async function GET(request) {
    try {
        await ConnectDB();
        const emails = await EmailModel.find({});
        return NextResponse.json({ emails });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await ConnectDB();
        const id = await request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
        }
        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}