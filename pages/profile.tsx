import Photo from 'components/Photo'
import { FC } from 'react'

const Profile: FC = (props) => {
	return (
		<div className='pt-20 lg:pt-0 mx-8 flex h-screen text-2xl'>
			<div className='flex flex-col'>
				<span className='text-4xl my-2 font-bold'>Hey!</span>
				<span>I'm Koban</span>
				<Photo />
			</div>
		</div>
	)
}

export default Profile
