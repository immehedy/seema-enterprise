// types/contentful.ts
export interface ContentfulAsset {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      file: {
        url: string;
        details: {
          size: number;
          image?: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  }
  
  export interface MachineEntry {
    sys: {
      id: string;
      createdAt: string;
      updatedAt: string;
    };
    fields: {
      name: string;
      slug: string;
      brand: string;
      model: string;
      category: string;
      year: number;
      condition: string;
      price: number;
      location: string;
      images?: ContentfulAsset[];
      features?: string[];
      specifications?: Record<string, any>;
      description?: {
        nodeType: string;
        content: any[];
      };
      advantages?: string[];
      technicalDetails?: Record<string, any>;
      isAvailable: boolean;
      isFeatured: boolean;
      seller?: {
        name: string;
        contact: string;
        email: string;
        location: string;
      };
    };
  }