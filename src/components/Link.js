import NextLink from 'next/link'

const Link = ({ href, children, ...rest }) => (
  <NextLink href={href} {...rest}>
    <a href={href}>{children}</a>
  </NextLink>
)

export default Link
