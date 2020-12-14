export namespace NSIQuality {
  export interface IContentQualityConfig {
    enabledRole?: string[]
    questionsData: IQuestionConfig[]
  }

  export interface IQuestionConfig {
    type: string
    name: string
    desc?: string
    questions: IQualityQuestion[]
  }
  export interface IQualityQuestion {
    position: Number
    question: String,
    options: IQualityQuestionOption[]
  }

  export interface IQualityQuestionOption {
    name: string
    weight: Number
    selected?: boolean
  }



  export interface qualityResponse {
    identifier: string
    rootOrg: string
    org: string
    resourceId: string
    resourceType: string //content
    userId: string
    templateId: string
    templeteName: string
    compositeScore: number
    minimunQualifier: number
    finalMaxScore: number
    finalMinScore: number
    finalTotalScore: number
    finalWeightedAvg: number
    finalMaxWeightedAvg: number
    finalMinWeightedAvg: number
    criteriaModels: ICriteriaModels[]
    timeStamp: string
  }
  export interface ICriteriaModels {
    criteria: string
    totalScore: number
    weightage: number
    weightedAvg: number
    maxScore: number
    minScore: number
    maxWeightedAvg: number
    minWeightedAvg: number
    qualifiers: IQualifiers[]
  }
  export interface IQualifiers {
    name: string
    evaluated: string
    scoreValue: number
    scoreRange?: number
    scoringType: string
  }
}