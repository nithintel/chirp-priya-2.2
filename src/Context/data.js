export const tempData = {
  languageDetails: [
    {
      name: 'English',
      languageId: 'a1W0v000002HMqHEAW',
    },
    {
      name: 'German',
      languageId: 'a1W0v000002HMqMEAW',
    },
  ],
  employeeDetails: {
    name: '10000',
    fullName: 'Brecheteau, Magda',
    employeeId: 'a0y0v000001GjwCAAS',
    emailAddress: 'test-brecheteaumagda@praintl.com',
    country: 'NETHERLANDS',
  },
  chirpList: [
    {
      year: 2018,
      recordId: 'aFl0v000000024ACAQ',
      reason: null,
      proficiency: 'Child',
      parent: 'a0y0v000001GjwCAAS',
      month: 'March',
      language: 'English',
      gender: 'Male',
      email: 'abc@cdef.com',
      country: 'India',
      age: 3,
      active: true,
    },
    {
      year: 2017,
      recordId: 'aFl0v000000024FCAR',
      reason: null,
      proficiency: 'Child',
      parent: 'a0y0v000001GjwCAAS',
      month: 'May',
      language: 'English',
      gender: 'Male',
      email: 'abc@cdef.com',
      country: 'India',
      age: 4,
      active: true,
    },
  ],
}

export const tabTitles = {
  first: 'What is Chirp?',
  second: ' I want to register my child(ren) for ChIRP',
  third: ' I no longer wish my child(ren) to participate in ChIRP',
  updatedSecond: 'I want to update my child(ren)\'s registration for ChIRP'
}
export const firstPageData = {
  image: '/images/chirpicon.jpg',
  title: 'What is Chirp?',
  content:
    "As we know, anyone considering participation in a clinical trial must be provided with information about the trial, including the participant's responsibilities and commitments and the risks and benefits of participating in the trial. After reviewing this information the person is then asked to consent to participate in the trial. This is known as the informed consent process. For children participating in a clinical trial, informed consent (technically permission) has to be given by the parent(s)/ legal representative of the child. However, the child's view must also be taken into consideration, and for this reason we also need to ask the child to assent to taking part in the trial. In order to assent, the child must be given information about the trial that is written using language that they can understand and with the detail suitable for their age. The problem we in the Centre for Pediatric Development often find is that the wording used in these documents is too complex for children. This isn't surprising. These documents are written by adults who often have years of experience in drug development, and so have developed a particular vocabulary. The best people to review assent documents to check if a child of the relevant age can understand them are children themselves. For this reason PRA has created the Children's Internal Review Panel (ChIRP). ChIRP is a panel made up by children of our staff who we can ask to read and provide their thoughts on assent documents prepared for pediatric studies. This feedback can then be provided to the sponsor and used to develop more suitable assents for the children taking part in these studies. If this might be of interest to you and your child(ren), we welcome you to register yourself and your child(ren) using the link at the end of this announcement. Identities are kept confidential, it is completely voluntary, and you can de-register at any time. If you would like any more information please do not hesitate to contact the ChIRP team.",
}

export const agreement = [
  {
    id: 1,
    label:
      'I have discussed ChIRP with my child(ren) and I and they have agreed they are interested in taking part.',
  },
  {
    id: 2,
    label:
      'I agree for my child(ren) to be listed in the database of participants. I understand that this will include their name, date of birth and gender.',
  },
  {
    id: 3,
    label:
      'I understand that I can request for my child to be removed from the database at any time.',
  },
  {
    id: 4,
    label:
      'I understand that each child will be allocated a unique number in the database and their name and date of birth will not be visible in the database.',
  },
  {
    id: 5,
    label:
      'I understand that any report generated from the database will only include the allocated unique number, age and gender of the child.  ',
  },
  {
    id: 6,
    label:
      'I understand that the PRA system administrator will be able to see my child’s month and year of birth and country in which they live only.  ',
  },
  {
    id: 7,
    label:
      'I understand my PRA email address will be stored in the database and will be used to send me an emailed link to access  any review requests.  ',
  },
]

export const reasonForDiscontinuation = [
  { label: 'Takes too much time', id: '1' },
  { label: 'Too complicated', id: '2' },
  { label: 'No longer interested', id: '3' },
  { label: 'Other', id: '4' },
]


export const generateArrayOfYears = () => {
  var max = new Date().getFullYear()
  var min = max - 17
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}

export const deregistrationMessages = {
  initialMessgae: `Thank you for your participation to date. We understand that you
  would like to remove your child(ren) from the ChIRP database. No
  further review requests will be sent to you for your child(ren).
  It would be really helpful for us if you could let us know why you
  or your child(ren) no longer wish to take part to help us improve
  ChIRP in the future.`,
  childRemovalMessage: `Thank you for your participation!  You have removed all child participants, so you are de-registering from ChIRP. You are welcome to register again at any time. If this was a mistake, cancel this action and add a child participant.`
}