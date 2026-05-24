import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/partner-connectors';

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('GET /api/partners/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products', products: [] }, { status: 500 });
  }
}