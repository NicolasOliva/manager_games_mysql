import { DOWNLOAD_DIFFERENCE,
         DOWNLOAD_DIFFERENCE_SUCCESS,
         DOWNLOAD_DIFFERENCE_ERROR 
} from '../types'; 

const initialState = {
    differences: {},
    error: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case DOWNLOAD_DIFFERENCE:
            return {
                ...state,
                error: null
            }
        case DOWNLOAD_DIFFERENCE_SUCCESS:
            return {
                ...state,
                differences: action.payload,
                error: false
            }
        case DOWNLOAD_DIFFERENCE_ERROR:
            return {
                ...state,
                difference: null,
                error: true
            }

        default: 
            return {
                ...state
            }
        
    }
}