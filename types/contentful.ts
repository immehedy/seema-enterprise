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
      size: string;
      speed: string;
      series: string;
      origin: string;
      availableBy: string;
      type: string;
      refNo: number;
      images?: ContentfulAsset[];
      specification?: any;
      isFeatured?: boolean;
      isAvailable: boolean;
    };
  }