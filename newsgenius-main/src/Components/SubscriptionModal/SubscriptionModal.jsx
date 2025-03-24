import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline:'none',
  boxShadow: 24,
  p: 4,
  borderRadius:4,
};

const features=["Prioritize ranking in conversations and search", 
  "See approximately twice as many news between ads in your For you timelines", 
  "Experience high quality videos",
  "All existing features, including comments, bookmark,early access to new features"
]

export default function SubscriptionModal({handleClose,open}) {
  

  const {plan,setPlan}=React.useState("Anually") 

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='flex items-center space-x-3'>
               <IconButton onClick={handleClose} aria-label="delete">
               <CloseIcon />
               </IconButton>
              </div>
        <div className='flex justify-center py-10'>
          <div className='w-[98%] space-y-10'>
            <div className='p-5 rounded-md flex items-center justify-between bg-slate-300 shadow-lg'> 
              <h1 className='text-lg pr-5'>Subscribers with a verified phone number will get a green checkmark once approved</h1>
              <img className='w-20 h-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png" alt="" />
            </div>

            <div className='flex justify-between border rounded-full px-5 py-3 border-gray-700'>

              <div>
                <span onClick={()=>setPlan("Anually")} className={`${plan==="Anually"?"text-black":"text-gray-400"}cursor-pointer`}>Anually</span>
                <span className='text-green-500 text-sm ml-5'>Save 12%</span>
              </div>
              <p onClick={()=>setPlan("monthly")} className={`${plan==="monthly"?"text-black":"text-gray-400"}cursor-pointer`}>
                Monthly
              </p>
            </div>

            <div className='space-y-3'>
              {features.map((item)=> <div className='flex items-center space-x-5'>
                <FiberManualRecordIcon sx={{width:"7px", height:"7px"}}/>
                <p className='text-xs'>{item}</p>
              </div>)}

            </div>

            <div className='cursor-pointer flex justify-center bg-gray-500 text-white rounded-full px-5 py-3'>
              <span className='line-through italic'>₹7,800.00</span>
              <span className='px-5'> ₹6,800.00/year</span>
            </div>


          </div>

        </div>
        </Box>
      </Modal>
    </div>
  );
}
