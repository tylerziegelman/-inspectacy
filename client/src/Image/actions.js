export const SAVE_URL = 'SAVE_URL'


export function saveUrl(url) {
    return async function(dispatch) {
        
                return dispatch({
                    type: 'SAVE_URL',
                    data: url
                })
            
    }

}