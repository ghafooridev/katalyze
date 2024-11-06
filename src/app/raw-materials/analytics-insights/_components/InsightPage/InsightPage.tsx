'use client';

import { useEffect, useState } from 'react';

import { getMaterialInsights, getMaterialSelector, postMaterialInsightComment } from '@/app/raw-materials/_services';
import { MaterialInsight, MaterialMetaData } from '@/types/RawMaterial';

import InsightChatBox from './InsightChatBox';
import InsightList from './InsightList';

const InsightPage = () => {
  const [selectedInsight, setSelectedInsight] = useState({});
  const [allInsights, setAllInsights] = useState<MaterialInsight[]>([]);
  const [materialSelector, setMaterialSelector] = useState<{ id: string; name: string }[]>();

  const getInsightData = async () => {
    const response: MaterialInsight[] = await getMaterialInsights();
    setAllInsights(response);
    const queryData = new URLSearchParams(window.location.search).get('insight');
    if (queryData && response.length) {
      const reqInsight = response.find((item) => item.id === queryData);
      if (reqInsight) setSelectedInsight(reqInsight);
    }
  };

  const getMaterialOptions = async () => {
    const response: MaterialMetaData = await getMaterialSelector();
    setMaterialSelector(response.materials);
  };

  const postComment = async (id, comment) => {
    const payload = { comment };
    try {
      const updatedInsight = await postMaterialInsightComment(id, payload);
      setSelectedInsight(updatedInsight);
      setAllInsights((prevInsights) => prevInsights.map((insight) => (insight.id === id ? updatedInsight : insight)));
    } catch (error) {
      throw new Error('Failed to post comment:', error);
    }
  };

  useEffect(() => {
    getInsightData();
    getMaterialOptions();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <InsightList
        data={allInsights}
        selectedInsight={selectedInsight}
        setSelectedInsight={setSelectedInsight}
        materialSelector={materialSelector}
      />
      <InsightChatBox selectedInsight={selectedInsight} postComment={postComment} materialSelector={materialSelector}/>
    </div>
  );
};

export default InsightPage;
