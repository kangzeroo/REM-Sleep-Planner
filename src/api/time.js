import moment from 'moment'

export const calculateWhenToSleep = (wakeUpTime, buffer) =>  {
  return [6,5,4,3,2,1].map((remCount)=>{
    const time = moment(wakeUpTime)
    return {
      time: time.subtract(buffer, 'minutes').subtract(remCount*1.5, 'hours'),
      sleptHours: remCount*1.5
    }
  })
  // .filter((x)=>{
  //   if(x.time.unix() < moment().hour(0).minute(0).unix()){
  //     return false
  //   }else{
  //     return true
  //   }
  // })
}

export const calculateWhenWillWake = (sleepNowTime, buffer) =>  {
  return [1,2,3,4,5,6].map((remCount)=>{
    const time = moment(sleepNowTime)
    return {
      time: time.add(buffer, 'minutes').add(remCount*1.5, 'hours'),
      sleptHours: remCount*1.5
    }
  })
}

export const calculateSleepNow = (buffer) => {
  return [1,2,3,4,5,6].map((remCount) => {
    const now = moment(new Date())
    return {
      time: now.add(buffer, 'minutes').add(remCount*1.5, 'hours'),
      sleptHours: remCount*1.5
    }
  })
}
