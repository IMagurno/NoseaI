export interface Prediction {
    status: 'starting' | "processing" | "succeded",
    id: 'string'
    output: [string, string]
    prediction: string | null
    images: Image[]
    y: number    
}

interface Image {
    id: number;
    url: string;
}

