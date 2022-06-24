import { FC } from 'react'

const Profile: FC = (props) => {
	return (
		<div className='pt-20 lg:pt-0 mx-8 flex h-screen text-2xl'>
			<div className='flex flex-col'>
				<span className='text-4xl my-2 font-bold'>Hey!</span>
				<span>{/* I'm Koban <span className='text-8xl -tracking-tighter'>.</span> */}</span>
			</div>
		</div>
	)
}

export default Profile
