'use server'

import { prisma } from "@/lib/prisma"

export const CheckExistence = async (name: string, email: string, userEmail: string) => {
  try {
    const checkCompany = await prisma.company.findFirst({
      where: {
        OR: [
          {
            name: name
          },
          {
            email: email
          }
        ]
      },
      select: {
        SubscriptionSelected: {
          select: {
            managerId: true
          }
        }
      }
    })


    if (!checkCompany) return {
      error: null,
      status: 200
    }

    if (checkCompany) {
      return {
        error: `Ya existe una compañía con ese nombre o correo electrónico`,
        message: `${checkCompany.SubscriptionSelected[0].managerId === userEmail ? `Nuestros registros indican que usted ${userEmail} ya cuenta con una PYME registrada con el mismo nombre o mismo correo electrónico, considere utilizar valores diferentes para poder continuar o inicie sesión en su cuenta.` : 'Nuestros sistemas indican que otro usuario ya ha registrado una PYME con el mismo nombre o correo electrónico, por favor intente nuevamente con un nombre y/o correo diferentes.'} `,
        status: 400
      }
    }
  } catch (error: any) {
    return {
      error: error.message,
      status: 400
    } 
  }
}