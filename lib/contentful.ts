import { ContentfulAsset, MachineEntry } from '@/types/contentful';
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import type { Document, Block, Inline, Text } from "@contentful/rich-text-types";


// Initialize Contentful client
export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

/**
 * Fetch a machine by its ID
 */
export async function getMachineById(id: string): Promise<MachineEntry | null> {
  try {
    const response = await contentfulClient.getEntry(id, {
      include: 2, // Include linked assets and references
    });
    
    return response as unknown as MachineEntry;
  } catch (error) {
    console.error('Error fetching machine from Contentful:', error);
    return null;
  }
}

/**
 * Fetch a machine by its slug
 */
export async function getMachineBySlug(slug: string): Promise<MachineEntry | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'machine',
      'fields.slug[match]': slug,
      include: 2,
      limit: 1,
    });
    
    if (response.items.length > 0) {
      return response.items[0] as unknown as MachineEntry;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching machine by slug:', error);
    return null;
  }
}

/**
 * Fetch all machines
 */
export async function getAllMachines(): Promise<MachineEntry[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'machine',
      include: 2,
    });
    
    return response.items as unknown as MachineEntry[];
  } catch (error) {
    console.error('Error fetching all machines:', error);
    return [];
  }
}


/**
 * Fetch all Cateogories
 */
export async function getAllCategories(): Promise<any[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'category',
      include: 2,
    });
    
    return response.items as unknown as any[];
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

/**
 * Helper function to convert rich text to plain text
 */
export function richTextToPlainText(richText: any): string {
  if (!richText || !richText.content) return '';
  
  let text = '';
  
  const extractText = (node: any): void => {
    if (node.nodeType === 'text') {
      text += node.value;
    } else if (node.content) {
      node.content.forEach(extractText);
    }
  };
  
  richText.content.forEach(extractText);
  return text.trim();
}

/**
 * Helper function to get image URL with proper protocol
 */
export function getImageUrl(asset: ContentfulAsset | undefined): string {
  if (!asset || !asset.fields?.file?.url) {
    return '/placeholder.svg';
  }
  
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

/**
 * Custom rendering options for Contentful rich text to HTML
 */
export const richTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => `<strong class="font-semibold">${text}</strong>`,
    [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
    [MARKS.CODE]: (text: string) => 
      `<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, next: any) => 
      `<p class="mb-3 last:mb-0 leading-relaxed">${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node: any, next: any) => 
      `<h1 class="text-3xl font-bold mb-4 mt-6 first:mt-0">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node: any, next: any) => 
      `<h2 class="text-2xl font-bold mb-3 mt-5 first:mt-0">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node: any, next: any) => 
      `<h3 class="text-xl font-bold mb-3 mt-4 first:mt-0">${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node: any, next: any) => 
      `<h4 class="text-lg font-semibold mb-2 mt-3 first:mt-0">${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node: any, next: any) => 
      `<h5 class="text-base font-semibold mb-2 mt-3 first:mt-0">${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node: any, next: any) => 
      `<h6 class="text-sm font-semibold mb-2 mt-2 first:mt-0">${next(node.content)}</h6>`,
    [BLOCKS.UL_LIST]: (node: any, next: any) => 
      `<ul class="list-disc list-outside mb-4 space-y-1 ml-6">${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node: any, next: any) => 
      `<ol class="list-decimal list-outside mb-4 space-y-1 ml-6">${next(node.content)}</ol>`,
    [BLOCKS.LIST_ITEM]: (node: any, next: any) => 
      `<li class="leading-relaxed">${next(node.content)}</li>`,
    [BLOCKS.QUOTE]: (node: any, next: any) => 
      `<blockquote class="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">${next(node.content)}</blockquote>`,
    [BLOCKS.HR]: () => `<hr class="my-6 border-border" />`,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      try {
        const { file, title, description } = node.data.target.fields;
        const imageUrl = file?.url ? `https:${file.url}` : null;
        const mimeType = file?.contentType || '';

        if (!imageUrl) return '';

        // Handle images
        if (mimeType.startsWith('image/')) {
          const alt = description || title || 'Embedded image';
          return `<img src="${imageUrl}" alt="${alt}" class="w-full h-auto rounded-lg my-4 max-w-2xl" />`;
        }

        // Handle other file types (PDF, documents, etc.)
        const fileName = title || 'Download file';
        return `<a href="${imageUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-accent hover:underline my-2">📎 ${fileName}</a>`;
      } catch (error) {
        console.error('Error rendering embedded asset:', error);
        return '';
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      console.warn('Embedded entry not handled:', node);
      return '';
    },
  },
};

/**
 * Convert Contentful rich text document to HTML string
 * @param document - The Contentful rich text document
 * @returns HTML string
 */
export function renderRichTextToHtml(document: any): string {
  if (!document) {
    return '';
  }

  // Handle invalid document structure
  if (!document.nodeType || !document.content) {
    console.warn('Invalid rich text document structure:', document);
    return '<p class="text-muted-foreground">Content unavailable</p>';
  }

  try {
    return documentToHtmlString(document as Document, richTextRenderOptions);
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return '<p class="text-muted-foreground">Unable to render content</p>';
  }
}

/**
 * Check if a rich text document has content
 */
export function hasRichTextContent(document: any): boolean {
  if (!document || !document.content || !Array.isArray(document.content)) {
    return false;
  }
  
  const checkNode = (node: Block | Inline | Text): boolean => {
    // Check if it's a text node with content
    if ('value' in node && node.nodeType === 'text') {
      return node.value.trim().length > 0;
    }
    
    // Recursively check nested content
    if ('content' in node && Array.isArray(node.content)) {
      return node.content.some(checkNode);
    }
    
    return false;
  };
  
  return document.content.some(checkNode);
}