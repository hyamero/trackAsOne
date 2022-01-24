import React, { useState } from 'react';
import { VscSignIn } from 'react-icons/vsc';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { ErrorMsg, Header, Input } from '@/components';
import toast from 'react-hot-toast';

const Join = () => {
  const [roomID, setRoomID] = useState<string>('');
  const [error, setError] = useState<string>('blank');
  const [showError, setShowError] = useState<boolean>(false);

  const {
    data: { id },
  } = useAuth();

  const errorMsg = (error: string) => {
    setError(error);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const requestJoin = async () => {
    setRoomID('');

    const roomRef = doc(db, 'rooms', roomID);

    const room = await getDoc(roomRef);
    const _room: IRoom = room.data() as IRoom;

    if (!room.exists()) toast.error('room does not exist');
    else if (_room.members.includes(id!))
      toast.error('you are already a member');
    else if (_room.requests.includes(id!))
      toast.error('you already sent a request');
    else if (_room.creator === id) toast.error('You are the owner of the room');
    else {
      toast.promise(
        updateDoc(roomRef, {
          requests: arrayUnion(id),
        }),
        {
          loading: 'sending request...',
          success: 'request sent!',
          error: 'request could not be sent.',
        }
      );
    }
  };

  return (
    <Layout>
      <Header title='Join a Room' />
      <div className='w-full flex justify-center items-center flex-col'>
        <Input
          handleChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          placeholder='enter room id'
          max={15}
        />

        <div className='inline-block mx-auto mt-2'>
          <button
            type='button'
            onClick={roomID ? requestJoin : () => null}
            className='btn btn-ring'
          >
            <p className='mr-4'>request join</p>
            <VscSignIn className='icon' />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
