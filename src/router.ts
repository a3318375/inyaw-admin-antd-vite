// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/article/blog`
  | `/article/blog/:id`
  | `/dashboard`
  | `/loading`
  | `/login`
  | `/notFound`
  | `/page1`
  | `/page2`
  | `/page3`

export type Params = {
  '/article/blog/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
