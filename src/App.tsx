import React from 'react'
import Main from './components/Main/Main'
import useAuthorsQuery from './hooks/useAuthorsQuery';
import useCommentsQuery from './hooks/useCommentsQuery';

const App = (): JSX.Element => {

  const { isError: isAuthorsError, isLoading: isAuthorsLoading, } = useAuthorsQuery();
  const { isLoading: isCommentsLoading, isError: isCommentsError } = useCommentsQuery();

  return (
    <div className={ isAuthorsError || isCommentsError || isAuthorsLoading || isCommentsLoading ? "app app_loading" : "app"}>
      <Main />
    </div>
  )
}

export default App
