/** An email address that wraps after the "@" on narrow screens instead of breaking mid-word. */
export function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@') + 1
  return (
    <>
      {email.slice(0, at)}
      <wbr />
      {email.slice(at)}
    </>
  )
}
