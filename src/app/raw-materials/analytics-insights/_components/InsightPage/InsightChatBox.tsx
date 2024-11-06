'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { format, isValid, parseISO } from 'date-fns';

import AtomIcon from '@/icons/AtomIcon';
import BeakerIcon from '@/icons/BeakerIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import InsightDocsIcon from '@/icons/InsightsDocsIcon';
import KatalyzeAvatarIcon from '@/icons/KatalyzeAvatarIcon';
import SubmitIcon from '@/icons/SubmitIcon';
import { getMaterialNameById } from '@/lib/utils';

const InsightChatBox = ({ selectedInsight, postComment, materialSelector }) => {
  const { id } = selectedInsight;
  const [typedMessage, setTypedMessage] = useState<string>('');

  const OnMsgSubmit = async (chatMsg: string) => {
    await postComment(id, chatMsg);
    setTypedMessage('');
  };

  const materialName = getMaterialNameById(materialSelector, selectedInsight?.material_id);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedInsight]);

  const formatTime = (time: string) => {
    let date: Date;
    try {
      date = parseISO(time);
    } catch (error) {
      return time;
    }
    if (!isValid(date)) {
      return time;
    }
    try {
      return format(date, 'h:mm a dd MMM yyyy');
    } catch (error) {
      return time;
    }
  };

  return (
    <div className="w-full lg:w-2/3">
      {Object.keys(selectedInsight).length ? (
        <Card className="w-full rounded-xl shadow-sm border border-gray-200 h-full ">
          <CardHeader className="p-4">
            <div className="flex flex-row w-full justify-between items-center">
              <p className="font-semibold text-lg text-gray-900">{selectedInsight?.card_data.title}</p>
              <div className='hidden'>
                <Popover>
                  <PopoverTrigger>
                    <Button isIconOnly variant="light" aria-label="Like">
                      <DownloadIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col  justify-start min-w-52">
                    <div></div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardHeader className="p-6 bg-gray-50 rounded-none ">
            <div className="flex flex-row gap-2">
              <div className="w-12 h-12">
                <KatalyzeAvatarIcon />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-sm font-medium text-gray-700">
                    Katalyze AI
                  </p>
                  <p className="text-xs font-normal text-gray-600">
                    {formatTime(selectedInsight?.card_data?.timestamp)}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-b-lg p-2 bg-white">
                  <p className="text-sm font-normal">{selectedInsight?.card_data.body}</p>
                </div>
                <div className="flex flex-row justify-between items-top">
                  <div className="flex flex-row gap-3">
                    <div className="flex gap-[2px] items-center text-sm border p-1 bg-white rounded-lg">
                      <AtomIcon />
                      <p className="font-medium">{materialName}</p>
                    </div>
                    <div className="flex gap-[2px] items-center text-sm border p-1 bg-white rounded-lg">
                      <BeakerIcon />
                      <p className="font-medium">{selectedInsight?.process_id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="bg-gray-50 p-0 flex flex-col">
            <div className="flex flex-col flex-grow mt-auto h-[300px] overflow-y-auto p-4">
              {selectedInsight.comments_data?.map((chat, idx) => (
                <div
                  key={idx}
                  className={`p-4 flex flex-row gap-2 ${idx === 0 && 'mt-auto'}`}
                >
                  <Avatar
                    src=""
                    showFallback
                    name={chat.username ? chat.username : 'User'}
                    size="md"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <p className="font-medium text-gray-700 text-sm">
                        {chat.username}
                      </p>
                      <p className="font-normal text-xs text-gray-600">
                        {format(chat?.timestamp, 'h:mm a dd MMM yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="font-normal text-sm text-gray-600">
                        {chat.user_email}
                      </p>
                    </div>
                    <div
                      className="max-w-[390px] mt-2 p-1 pl-2 text-sm font-regular
                    text-gray-700 border border-gray-200 bg-white rounded-b-lg"
                    >
                      {chat.comment}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 bg-white flex flex-row gap-2 items-center">
              <Textarea
                size="sm"
                minRows={1}
                maxRows={3}
                variant="bordered"
                placeholder="Start typing your note on this insight...."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
              <Button
                disabled={!typedMessage}
                variant="bordered"
                className={`bg-primary-700 text-primary-foreground text-base font-semibold leading-tight 
                    border-none ${!typedMessage && 'opacity-50'} `}
                onClick={() => OnMsgSubmit(typedMessage)}
              >
                <span className="">{'Submit'}</span>
                <div className="h-5 w-5">
                  <SubmitIcon />
                </div>
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="w-full rounded-xl shadow-sm border border-gray-200 h-full bg-gray-50">
          <CardBody className="">
            <div className="flex flex-col text-center items-center justify-center h-full">
              <InsightDocsIcon />
              <p className="text-gray-500 font-medium">
                Select an insight to continue
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default InsightChatBox;
