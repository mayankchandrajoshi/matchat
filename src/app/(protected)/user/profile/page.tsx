import ProfilePictureInput from "@/components/forms/ProfilePictureInput";
import UserProfileForm from "@/components/forms/UserProfileForm";
import RightSectionPlaceholder from "@/components/placeholders/RightSectionPlaceholder";

export default function Profile() {

    return (
        <div className="w-full h-full bg-inherit flex flex-row">
            <div className='w-full sm:w-[350px] lg:w-[450px] flex-shrink-0 flex-grow-0 h-full bg-inherit p-5 flex flex-col gap-3'>
                <h1 className='font-bold text-[22px]'>Profile</h1>
                <div className="flex-1 grid grid-cols-1 grid-rows-2 px-3">
                    <ProfilePictureInput/>
                    <UserProfileForm/>
                </div>
            </div>
            <div className='flex-0 sm:flex-1 h-full bg-slate-800'>
                <RightSectionPlaceholder/>
            </div>
        </div>
    )
}