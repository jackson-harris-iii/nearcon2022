import React, { Fragment, useState, useEffect } from 'react'
import {
  Container,
  Input,
  Grid,
  Switch,
  Modal,
  Tooltip,
  Button,
} from '@nextui-org/react'
// import InfoIcon from '@mnextui-org/react'
// import AddCircleIcon from '@mnextui-org/react'
// import CancelIcon from '@mnextui-org/react'
// import DatePicker from 'react-datepicker';
// import moment from 'moment'

Button

const FormContainer = () => {
  // const theme = useTheme();
  // const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput] = useState('true')
  const [address, setAddress] = useState('')
  const [projectName, setProjectName] = useState('')
  const [accountData, setAccountData] = useState({ 0: {} })
  const [endDate, setEndDate] = useState(new Date())
  const [balance, setBalance] = useState(0)

  //this set the maximum number of wallet addresses that can be looked up at once
  const maxFields = 5

  const handleAddressChange = (e) => {
    e.preventDefault()
    let key = e.target.attributes.data.value
    let temp = { ...accountData }
    if (temp[key]) {
      temp[key].address = e.target.value
    } else {
      temp[key] = { address: e.target.value }
    }
    temp[key] = { address: e.target.value }
    setAccountData(temp)
  }

  const handleStartBalance = (e) => {
    e.preventDefault()
    let key = e.target.attributes.data.value
    let temp = { ...accountData }
    if (temp[key]) {
      temp[key].startBalance = e.target.value
    } else {
      temp[key] = { startBalance: e.target.value }
    }
    setAccountData(temp)
  }

  const handleSubmission = async (e) => {
    e.preventDefault()
    let entries = 0
    let lengths = 0

    // if (!moment(endDate).isAfter(startDate)) {
    //   alert("Please Enter an End date that is after the Start Date!")
    //   return;
    // }

    // setIsLoading(true);
    // setSubmit(true);

    // let start = moment(startDate).format("YYYY-MM-DD");
    // let end = moment(endDate).format("YYYY-MM-DD");
    // let addresses = Object.entries(accountData).map((account, index) => ({name: `Account ${index + 1}`, ...account[1]}))
    // let payload = {
    //   start, end, currency: currency[1], priceData, exportOutput, addresses
    // };
    // setSubmission(payload);
  }

  const handleAddInputFields = (e) => {
    let len = Object.keys(accountData).length
    if (len < maxFields) {
      let temp = { ...accountData }
      let next = Object.keys(accountData)?.[Object.keys(accountData).length - 1]
      temp[
        parseInt(
          Object.keys(accountData)?.[Object.keys(accountData).length - 1]
        ) + 1
      ] = {}
      setAccountData(temp)
    }
  }

  const handleRemoveAddress = (e, val) => {
    let temp = { ...accountData }
    delete temp[parseInt(val)]
    setAccountData(temp)
  }

  return (
    <>
      <form noValidate style={{ paddingTop: '3em', paddingBottom: '.5em' }}>
        {/* Start / End Date */}

        <Grid>
          <Grid.Container xs={6}>
            <label style={{ marginRight: '.5em' }}>Project Name</label>
            {/* <DatePicker value={moment(startDate).format("YYYY-MM-DD")} onChange={date => setStartDate(date)} /> */}

            <Input
              name={'amount input'}
              fullWidth={true}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="optional"
              value={projectName}
            ></Input>
          </Grid.Container>
        </Grid>

        <br />

        {/* Dynamic Form Fields */}

        <Grid.Container>
          <Grid.Container alignItems="flex-end" xs={12}>
            <Grid.Container alignItems="center" xs={1}>
              <Button
                aria-label={'add input field'}
                onClick={handleAddInputFields}
              >
                Add new data point
              </Button>
            </Grid.Container>
            {/* {Object.keys(accountData).map((val, index) => {
              return (
                <Grid.Container
                  key={index}
                  alignItems="flex-end"
                  justify="flex-end"
                  xs={12}
                  style={{ marginTop: '.5em' }}
                >
                  {val?.length > 0 ? (
                    <Grid.Container
                      xs={1}
                      alignItems="flex-end"
                      justify="flex-end"
                    >
                      <Button
                        aria-label={'remove address field'}
                        fontSize="small"
                        onClick={(e) => handleRemoveAddress(e, val)}
                      >
                        Delete Row
                      </Button>
                    </Grid.Container>
                  ) : null}
                  <Grid.Container xs={12}>
                    <Grid xs={9}>
                      <label name="start balance">
                        Search by Wallet Address(s)
                      </label>
                      <Input
                        name={'address input'}
                        fullWidth={true}
                        onChange={(e) => handleAddressChange(e)}
                        placeholder="required"
                        value={accountData[val] ? accountData[val].address : ''}
                      ></Input>
                    </Grid>
                    <Grid.Container xs={3}>
                      <Input
                        name={'amount input'}
                        fullWidth={true}
                        onChange={(e) => handleStartBalance(e)}
                        placeholder="optional"
                        value={
                          accountData[val] ? accountData[val].startBalance : ''
                        }
                      ></Input>
                    </Grid.Container>
                  </Grid.Container>
                </Grid.Container>
              )
            })} */}
          </Grid.Container>
        </Grid.Container>
        <br />
        <br />

        {/* submit button */}

        <Button onClick={handleSubmission}>Create</Button>
      </form>
    </>
  )
}

export default FormContainer
