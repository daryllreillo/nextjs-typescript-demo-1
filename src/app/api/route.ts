/* 
    GET /api
*/
'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { mongoDbClient, todoListCollection } from '@/app/api/mongoDbClient';

export async function GET(request: Request, response: NextResponse) {
  // console.log('GET ROUTE');
  // const reqBody = await request.json();
  // const usrPrefixRegex = new RegExp(reqBody.usrPrefix);

  try {
    await mongoDbClient.connect();
    const result = (await todoListCollection.find({ id: /TLUSR12345_*/ }).toArray()).sort((a, b) => (a.date > b.date ? -1 : 0));
    return NextResponse.json(result);
  } catch (error) {
    throw new Error('GET request failed');
  }
}

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  try {
    await mongoDbClient.connect();
    let result;
    if (reqBody.new === true) {
      // console.log('POST ROUTE, new');
      result = await todoListCollection.insertOne(reqBody.todoItem);
    } else {
      // console.log('POST ROUTE, !new');
      result = await todoListCollection.findOneAndReplace({ id: reqBody.todoItem.id }, reqBody.todoItem);
      console.log(result);
    }
    return NextResponse.json(result);
  } catch (error) {
    throw new Error('POST request failed');
  }
}

export async function DELETE(request: NextRequest) {
  // console.log('DELETE ROUTE');
  const reqBody = await request.json();

  try {
    await mongoDbClient.connect();
    const result = await todoListCollection.deleteOne({ id: reqBody.id });
    return NextResponse.json(result);
  } catch (error) {
    throw new Error('DELETE request failed');
  }
}

// export async function PATCH(request: NextRequest) {
//   console.log('PATCH ROUTE');
//   const reqBody = await request.json();

//   try {
//     await mongoDbClient.connect();
//     const result = await todoListCollection.findOneAndReplace({ id: reqBody.todoItem.id }, reqBody.todoItem);
//     return NextResponse.json(result);
//   } catch (error) {
//     throw new Error('PATCH request failed');
//   }
// }
