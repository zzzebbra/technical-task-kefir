import React from 'react'
import Main from './components/Main/Main'
import useAuthorsQuery from './hooks/useAuthorsQuery';
import useCommentsQuery from './hooks/useCommentsQuery';

const App = (): JSX.Element => {

  const { isError: isAuthorsError } = useAuthorsQuery();
  const { isLoading: isCommentsLoading } = useCommentsQuery();

  return (
    <div className={ isAuthorsError || isCommentsLoading ? "app app_loading" : "app"}>
      <Main />
    </div>
  )
}

export default App
