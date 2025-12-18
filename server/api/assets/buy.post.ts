import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body || !body.assetType) {
        throw createError({ statusCode: 400, statusMessage: 'Missing asset details' })
    }

    // Mock logic: deduct cash, create asset record
    return {
        success: true,
        assetId: 'ast_' + Math.floor(Math.random() * 10000)
    }
})
