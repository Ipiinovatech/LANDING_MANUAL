export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Datos recibidos en la API:", body);

    const { nombre, descripcion, prioridad, customFields, assignees, due_date } = body;

    const now = Date.now(); // Fecha actual en milisegundos

    const response = await axios.post(
      `https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`,
      {
        name: nombre,
        description: descripcion,
        priority: prioridad,
        start_date: now,           // ← Agregado
        due_date: due_date,        // ← Ya lo tenías
        assignees: assignees,
        custom_fields: [
          {
            id: "6e21ec58-7c28-4975-af25-fc17f4d2a16d",
            value: customFields.nombreEmpresa,
          },
          {
            id: "73b17518-309a-4fe2-9ebd-975a00d1cf0f",
            value: customFields.correo,
          },
          {
            id: "29e266b8-51f6-4246-b527-095a3e7811ba",
            value: customFields.telefono,
          },
          {
            id: "fabd7c03-2deb-401c-9abc-dd88b66cccc7",
            value: customFields.servicio,
          }
        ]
      },
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN || "",
          "Content-Type": "application/json",
        }
      }
    );


    console.log("Respuesta de ClickUp:", response.data);
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Error completo:", error);
    console.error("error.response:", error?.response);
    console.error("error.response.data:", error?.response?.data);
    console.error("error.message:", error?.message);

    return NextResponse.json(
      { error: "Error al crear la tarea en ClickUp" },
      { status: 500 }
    );
  }
}
