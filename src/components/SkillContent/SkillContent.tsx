import React, { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import checkedItemStore from '../../store/checkedItemStore';
import {
  getMasteryProgress,
  type SkillBodyProps,
  type SkillContentProps,
} from './type';
import { Block, Content, CheckedContent, SkillText } from './style';
import { LinearProgress } from '@mui/material';

const UpdateSkill = lazy(
  () => import('../../modules/UpdateProfileSkill/UpdateProfileSkill'),
);

const SkillBody: React.FC<SkillBodyProps> = ({ skill, progress }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const addItem = checkedItemStore((state) => state.addItem);
  const removeItem = checkedItemStore((state) => state.removeItem);

  const handleCheckItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userId === userData.id || userData.role === 'Admin') {
      if (isChecked) {
        removeItem(skill.name);
      } else {
        addItem(skill);
      }
      setCheck(!isChecked);
    }
  };

  const handlSetUpdateOpen = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  const SkillComponent = isChecked ? CheckedContent : Content;

  return (
    <SkillComponent
      onClick={isChecked ? undefined : handlSetUpdateOpen}
      onContextMenu={handleCheckItem}
    >
      <LinearProgress
        className={progress.className}
        variant="determinate"
        value={progress.value}
      />
      <SkillText>{skill.name}</SkillText>
      {(userId === userData.id || userData.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense>
            <UpdateSkill onClick={handlSetUpdateOpen} userSkill={skill} />
          </Suspense>
        )}
    </SkillComponent>
  );
};

const SkillContent: React.FC<SkillContentProps> = ({ skills }) => {
  return (
    <Block>
      {skills.map((skill) => {
        const progress = getMasteryProgress(skill.mastery);
        return <SkillBody key={skill.name} skill={skill} progress={progress} />;
      })}
    </Block>
  );
};

export default SkillContent;
