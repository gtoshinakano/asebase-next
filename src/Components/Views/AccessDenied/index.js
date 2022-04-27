//import { signIn } from 'next-auth/client'

export default function AccessDenied() {
  return (
    <div className="flex flex-col pt-52 overflow-hidden justify-center">
      <h1 className="mx-auto mb-2 text-2xl font-bold text-center">
        Welcome to this Demo!
      </h1>
      <span className="mx-auto block text-sm mb-8 text-center font-semibold">DB of Brazilian Ex Trainees and Students <br />from Japanese Internship Programs</span>
      <span className="mx-auto block text-sm">This project uses :</span>
      <h1 className="mx-auto text-blue-500 text-xs font-semibold">NextAuth, React Query, Tailwind and Styled Components and others</h1>
      <p className="mx-auto text-xs">
        {/* <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}></a> */}
        This project will be finished one day. All support is welcome.
      </p>
    </div>
  );
}
