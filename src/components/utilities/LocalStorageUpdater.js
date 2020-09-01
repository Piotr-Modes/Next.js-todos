import { useRecoilTransactionObserver_UNSTABLE } from 'recoil'
import { todoListState, listOfDeletedTodoIdsState } from '../../recoil'

import { localStorageSave } from '../../helperFunctions/localStorageHelper'

const LocalStorageUpdater = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    localStorageSave('todoAppData-TodoList', snapshot.getLoadable(todoListState).contents)
    localStorageSave(
      'todoAppData-ListOfDeletedTodoIds',
      snapshot.getLoadable(listOfDeletedTodoIdsState).contents,
    )
  })
  return null
}

export default LocalStorageUpdater
