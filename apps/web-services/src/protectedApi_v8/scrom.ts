import axios from 'axios'
import { Router } from 'express'
import { axiosRequestConfig } from '../configs/request.config'
import { CONSTANTS } from '../utils/env'
import { ERROR } from '../utils/message'
import { extractUserIdFromRequest } from '../utils/requestExtract'

const unknown = 'Failed due to unknown reason'
const apiEndpoints = {
  deleteScromData: `${CONSTANTS.AUTHORING_BACKEND}/action/scrom/delete`,
  getScromData: `${CONSTANTS.AUTHORING_BACKEND}/action/scrom/fetch`,
  postScromData: `${CONSTANTS.AUTHORING_BACKEND}/action/scrom/add`,
}

export const scromApi = Router()

scromApi.get('/:id', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    const org = req.header('org')
    const rootOrg = req.headers.rootorg
    const contentId = req.params.id

    if (!org || !rootOrg) {
      res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
      return
    }
    if (!contentId) {
      res.status(400).send(ERROR.GENERAL_ERR_MSG)
      return
    }

    const response = await axios.get(apiEndpoints.getScromData, {
      ...axiosRequestConfig,
      headers: {
        org,
        rootOrg,
      },
      params: {
        contentId,
        userId,
      },
    })
    res.send((response.data))

  } catch (err) {
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})

scromApi.post('/add/:id', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    const org = req.header('org')
    const rootOrg = req.headers.rootorg
    const contentId = req.params.id
    if (!org || !rootOrg) {
      res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
      return
    }
    if (!contentId) {
      res.status(400).send(ERROR.GENERAL_ERR_MSG)
      return
    }
    const url = `${apiEndpoints.postScromData}`
    const response = await axios.post(url, req.body,
      {
        ...axiosRequestConfig,
        headers: {
          org,
          rootOrg,
        },
        params: {
          contentId,
          userId,
        },
        timeout: Number(CONSTANTS.KB_TIMEOUT),
      }
    )
    res.send(response.data)

  } catch (err) {
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})
scromApi.delete('/remove/:id', async (req, res) => {
  try {
    const userId = extractUserIdFromRequest(req)
    const org = req.header('org')
    const rootOrg = req.headers.rootorg
    const contentId = req.params.id

    if (!org || !rootOrg) {
      res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
      return
    }
    if (!contentId) {
      res.status(400).send(ERROR.GENERAL_ERR_MSG)
      return
    }

    const response = await axios.post(apiEndpoints.deleteScromData, {}, {
      ...axiosRequestConfig,
      headers: {
        org,
        rootOrg,
      },
      params: {
        contentId,
        userId,
      },
    })
    res.send((response.data))

  } catch (err) {
    res.status((err && err.response && err.response.status) || 500).send(
      (err && err.response && err.response.data) || {
        error: unknown,
      }
    )
  }
})
