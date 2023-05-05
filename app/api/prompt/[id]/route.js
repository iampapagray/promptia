import { connectToDB } from "@/utils/database"
import Prompt from "@/models/Prompt"

// GET
export const GET = async (req, {params}) => {
    const {id} = params

    try {
        await connectToDB();

        const prompt = await Prompt.findById(id).populate('creator')

        if(!prompt){
            return new Response("Prompt not found", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 }) 
    }
}

// PATCH
export const PATCH = async (req, {params}) => {
    const {prompt, tag, userId} = await req.json();
    const {id} = params;

    try{
        await connectToDB();

        const currentPrompt = await Prompt.findById(id).where({creator: userId})

        if(!currentPrompt){
            return new Response("Prompt not found", { status: 404 })
        }

        currentPrompt.prompt = prompt
        currentPrompt.tag = tag
        await currentPrompt.save()

        return new Response(JSON.stringify(currentPrompt), { status: 200 })

    }catch(error){
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE
export const DELETE = async (req, {params}) => {
    const {id} = params;

    try {
        await connectToDB();

        const prompt = await Prompt.findByIdAndRemove(id)

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}