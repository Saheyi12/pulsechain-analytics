import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { isActive } = body;

    return NextResponse.json({
      success: true,
      alert: {
        id: params.id,
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    success: true,
    message: `Alert ${params.id} deleted successfully`,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    id: params.id,
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    symbol: 'BTC',
    targetPrice: 50000,
    condition: 'ABOVE',
    notificationType: 'EMAIL',
    isActive: true,
    createdAt: new Date().toISOString(),
  });
}