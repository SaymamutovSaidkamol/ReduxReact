export interface IRecipe {
    id: number,
    name: string,
    price: number,
    image: string,
    description?: string; 
}

export interface IPayload{
    limit: number,
    skip: number,
    total: number
}


export interface MediaProps {
  loading?: boolean;
}