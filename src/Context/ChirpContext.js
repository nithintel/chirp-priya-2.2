import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import {
  SuccessToastEmitter,
  ErrorToastEmitter,
} from '../components/ToastContainer'

export const ChirpContext = createContext()

const TOKEN_BASE_URL = 'https://pra--personal38.my.salesforce.com/services/oauth2/token'
const CHILD_BASE_URL =
  'https://pra--personal38.my.salesforce.com/services/apexrest/UserRegistration/'

export const ChirpProvider = (props) => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem('accessToken'))
  )
  const [userDetails, setUserDetails] = useState(null)
  const [chirpList, setChirpList] = useState([])
  const [languageDetails, setLanguageDetails] = useState(null)
  const [employeeDetails, setEmployeeDetails] = useState(null)
  const [loadedData, setLoadedData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [record, setRecord] = useState(null)
  const [addEditModal, setAddEditModal] = useState(false)
  const [isUserAlreadyRegistered, setIsUserAlreadyRegistered] = useState(false)
  const [deregisterModal, setDeregisterModal] = useState(false)
  const [isDataSubmitted, setIsDataSubmitted] = useState(null)
  const [checkBoxStatus, setCheckBoxStatus] = useState(isUserAlreadyRegistered)
  const [tabKeys, setTabKeys] = useState('home')
  const [deletedData, setDeletedData] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  // ==  get Token
/*chnages form the bharath end */
/*username: chirpintegrationuser@prahs.com
password: Emids@2021kP8uSWFURLpZrI9aQVRVAy07
client_id: 3MVG9BJjUUIJZf1x.rZ56QPRnX6r_tZLounO6AvCryfOfnqkr6y1JW3XmMWWGcDzEe27NLb0GROVlbNwI8Seu
 
client_secret: 5324EAEA322C0136D80EE26312FCC023F4F9F41915618BB3CB016910E4860F87
 
In Endpoint URL word PERSONAL38 should be replaced with CI */

/*bharath chnages end */


  const getToken = async () => {
    const response = await axios({
      url: TOKEN_BASE_URL,
      method: 'post',
      params: {
        username: 'chirpintegrationuser@prahs.com',
        password: 'Emids@2021kP8uSWFURLpZrI9aQVRVAy07',
        grant_type: 'password',
        client_id:
          '3MVG9BJjUUIJZf1x.rZ56QPRnX6r_tZLounO6AvCryfOfnqkr6y1JW3XmMWWGcDzEe27NLb0GROVlbNwI8Seu',
        client_secret:
          '5324EAEA322C0136D80EE26312FCC023F4F9F41915618BB3CB016910E4860F87',
      },
    
    })
    
    return response
  }
  // == get User userDetails
  const setWithExpiry = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setAccessToken(JSON.parse(localStorage.getItem('accessToken')))
  }
  const getWithExpiry = async (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (!itemStr || now.getTime() > item.expiry) {
      await getToken()
        .then((response) => {
          setWithExpiry('accessToken', response.data.access_token)
        })
        .catch((err) => console.log(err))
    }
  }
  //  == get child Details
  const getChildDetails = async () => {
    const response = await axios({
      url: CHILD_BASE_URL,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        username: 'userapi@prahs.comSSS',
      },

    })
    return response
  }
  const addLocalDataToServer = async () => {
    let submitMethod = 'post'
    let localData = chirpList.filter(({ active }) => active === true)
    let postLocalArray = localData.map(
      ({ recordId, ...keepRest }) => recordId.includes('-') && keepRest
    )
    // if post array is empty, dont post
    let anyNewData = postLocalArray.filter((e) => {
      return e !== false
    })

    let finalData = {
      chirpList: anyNewData,
    }
    const response = await axios({
      url: CHILD_BASE_URL,
      method: submitMethod,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: finalData,
    })
    return response
  }
  const addServerDataToServer = async () => {
    let submitMethod = 'patch'
    let localData = chirpList
      .filter(({ active }) => active === true)
      .filter(({ recordId }) => !recordId.includes('-'))

    let anyNewData =
      deletedData &&
      deletedData.filter((e) => {
        if (e !== e.length > 0) {
          e.active = false
        }
        return e
      })
    let deletedDataWithServerData = anyNewData.length
      ? [...localData, ...anyNewData]
      : localData

    let finalData = {
      chirpList: deletedDataWithServerData,
      // chirpList: localData,
    }
    const response = await axios({
      url: CHILD_BASE_URL,
      method: submitMethod,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: finalData,
    })
    return response
  }

  //  ! Add data to server
  const addDataToServer = async () => {
    let localData = chirpList
      .filter(({ active }) => active === true)
      .map(({ recordId, ...keepRest }) => recordId.includes('-') && keepRest)
    let anyNewLocalData = localData.filter((e) => {
      return e !== false
    })
    let serverData = chirpList
      .filter(({ active }) => active === true)
      .filter(({ recordId }) => !recordId.includes('-'))

    if (serverData.length > 0) {
      await addServerDataToServer()
        .then((res) => console.log('server data submitted to server'))
        // .then((res) => SuccessToastEmitter({ message: res.message }))
        .catch((err) => ErrorToastEmitter({ message: err }))
    }
    if (anyNewLocalData.length > 0) {
      await addLocalDataToServer()
        .then((res) => console.log('local data submitted to server'))
        // .then((res) => SuccessToastEmitter({ message: res.message }))
        .catch((err) => ErrorToastEmitter({ message: err }))
    }
  }

  // == Add child data locally
  const addChildData = async (data) => {
    await setChirpList((prevValue) => {
      return [...prevValue, data]
    })
    console.log(chirpList)
  }

  // == Edit child data
  const editChildData = async (data) => {
    // data is a object
    await setChirpList((prevState) => {
      var index = prevState
        .map(function (el) {
          return el.recordId
        })
        .indexOf(data.recordId)
      prevState.splice(index, 1, data)
      return prevState
    })
  }
  // == Delete child data
  const deleteChildDetails = async () => {
    await setChirpList((prevState) => {
      let deleteData = prevState
        .filter(({ active }) => active === true)
        .filter((chirp) => chirp.recordId === record)
      // convert arry to object and
      const convertArrayToObject = (array) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
          return {
            ...obj,
            ...item,
          }
        }, initialValue)
      }
      let data = convertArrayToObject(deleteData)
      let checkLocalRecordId = !data.recordId.includes('-')
      setDeletedData([...deletedData, checkLocalRecordId ? data : []])
      var index = prevState
        .map(function (el) {
          return el.recordId
        })
        .indexOf(data.recordId)
      prevState.splice(index, 1, { ...data, active: false })
      return prevState
    })
  }

  //  ==  Edit Record
  const editChild = async (id) => {
    setRecord(id)
    let data = chirpList
      .filter(({ active }) => active === true)
      .filter((chirpList) => {
        return chirpList.recordId === id
      })

    const result = data.map(
      ({ month, year, gender, language, proficiency }) => ({
        month,
        year,
        gender,
        language,
        proficiency,
      })
    )
    setLoadedData({
      month: result[0].month,
      year: result[0].year,
      gender: result[0].gender,
      language: result[0].language,
      proficiency: result[0].proficiency,
    })
    setAddEditModal(true)
  }

  // == deregister data
  const deregisterCompletely = async (data) => {
    const response = await axios({
      url: CHILD_BASE_URL,
      method: 'patch',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
    return response
  }
  useEffect(() => {
    getWithExpiry('accessToken')
  }, [accessToken])
  useEffect(() => {
    getChildDetails()
      .then((response) => {
        let { chirpList, languageDetails, employeeDetails } = response.data
        setUserDetails(response.data)
        setChirpList(chirpList)
        setLanguageDetails(languageDetails)
        setEmployeeDetails(employeeDetails)
        chirpList
          ? chirpList.filter(({ active }) => {
              if (active === true) {
                setIsUserAlreadyRegistered(true)
              }
            })
          : setIsUserAlreadyRegistered(false)
      })
      .catch((err) => console.log(err))
  }, [isDataSubmitted, accessToken])

  useEffect(() => {
    setInterval(() => {
      localStorage.removeItem('accessToken')
      getWithExpiry('accessToken')
    }, 120000)
  }, [accessToken])

  return (
    <ChirpContext.Provider
      value={{
        userDetails,
        setUserDetails,
        chirpList,
        employeeDetails,
        languageDetails,
        accessToken,
        setAccessToken,
        showModal,
        setShowModal,
        record,
        setRecord,
        deleteChildDetails,
        addChildData,
        getChildDetails,
        editChild,
        setLoadedData,
        loadedData,
        setAddEditModal,
        addEditModal,
        editChildData,
        isUserAlreadyRegistered,
        setIsUserAlreadyRegistered,
        deregisterModal,
        setDeregisterModal,
        addDataToServer,
        isDataSubmitted,
        setIsDataSubmitted,
        checkBoxStatus,
        setCheckBoxStatus,
        tabKeys,
        setTabKeys,
        deregisterCompletely,
        isUserLoggedIn,
        setIsUserLoggedIn,
      }}
    >
      {props.children}
    </ChirpContext.Provider>
  )
}
