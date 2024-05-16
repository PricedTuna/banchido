import { PropsWithChildren } from 'react'

function ActionsPageWrapper({children}: PropsWithChildren) {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      {children}
    </div>
  )
}

export default ActionsPageWrapper
