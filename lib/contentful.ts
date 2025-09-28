import { ContentfulAsset, MachineEntry } from '@/types/contentful'
import { createClient } from 'contentful'

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
})


export async function getMachineById(id: string): Promise<MachineEntry | null> {
  try {
    const response = await contentfulClient.getEntry(id, {
      include: 2, // Include linked assets
    })
    
    return response as unknown as MachineEntry
  } catch (error) {
    console.error('Error fetching machine from Contentful:', error)
    return null
  }
}

export async function getMachineBySlug(slug: string): Promise<MachineEntry | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'printingMachine',
      'fields.slug[match]': slug,
      include: 2,
      limit: 1,
    })
    
    if (response.items.length > 0) {
      return response.items[0] as unknown as MachineEntry
    }
    
    return null
  } catch (error) {
    console.error('Error fetching machine by slug:', error)
    return null
  }
}

// Helper function to convert rich text to plain text
export function richTextToPlainText(richText: any): string {
  if (!richText || !richText.content) return ''
  
  let text = ''
  
  const extractText = (node: any): void => {
    if (node.nodeType === 'text') {
      text += node.value
    } else if (node.content) {
      node.content.forEach(extractText)
    }
  }
  
  richText.content.forEach(extractText)
  return text
}

// Helper function to get image URL with proper protocol
export function getImageUrl(asset: ContentfulAsset | undefined): string {
  if (!asset || !asset.fields?.file?.url) {
    return '/placeholder.svg'
  }
  
  const url = asset.fields.file.url
  return url.startsWith('//') ? `https:${url}` : url
}
