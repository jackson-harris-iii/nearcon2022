const Container = ({
  children,
  className = '',
}: {
  children: JSX.Element[] | JSX.Element
  className?: string
}) => <div className={`mx-12 ${className}`}>{children}</div>

export default Container
