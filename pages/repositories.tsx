import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Repository } from '@/Molecules/Reposotory';

import { addComments, getRepositories } from '@/Services/repos';
import { ReposType } from '@/types/Repos';
import { Page } from '@/redux/user/types';
import { pageTitle } from '@/utils/GeneralFunctions';

import { setCurrentPage } from '@/redux/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';

const Repositories = ({}) => {
  const dispatch = useAppDispatch();
  const [AllRepos, setAllRepos] = useState<ReposType[]>();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.Repos;

      pageTitle(currentPageTitle);

      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [dispatch]);

  const getRepos = useCallback(async () => {
    try {
      const Repos: ReposType[] = [];

      const response = await getRepositories();
      const { status, data } = response;

      if (status == 200) {
        const tempRepos = data.data;
        console.log('tempRepos: ', tempRepos);
        {
          tempRepos.map((tempRepo: any) => {
            const repo: ReposType = {
              id: tempRepo.id,
              projectName: tempRepo.name,
              branch: tempRepo.default_branch,
              description: tempRepo.description,
              repoURL: tempRepo.raw_data.html_url,
              isHookExists: tempRepo.isHookExists,
            };

            Repos.push(repo);
          });
        }
        setAllRepos(Repos);
      } else throw new Error('failed to get repos');
    } catch (error) {
      console.log(error);
      toast.error('get repos error');
    }
  }, []);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  const startCommenting = async (id: number) => {
    try {
      const repoId = id;

      if (repoId) {
        const response = await addComments(repoId);
        console.log('comments:', response);

        const { status, data } = response;
        if (status == 200) {
          toast.success('Auto Commenting Added');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('failed to add comments, try after sometime!');
    }
  };

  return (
    <div className="w-full min-h-screen py-5 bg-white">
      {/* page header */}
      <div className="flex flex-col items-start justify-between px-4">
        <h1 className="text-2xl page-title">Repositories</h1>

        <p className="-mt-1 text-base text-neutral-550">
          Dolor sunt non qui adiptsicing mollit add
        </p>
      </div>

      {/* Repository */}
      <div className="px-5 mt-10">
        {AllRepos &&
          AllRepos.map((repo, index) => {
            const onClickHandler = () => {
              startCommenting(repo.id);
            };
            return (
              <div key={index} className="block w-full space-y-4">
                <Repository RepoData={repo} onClickHandler={onClickHandler} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Repositories;
