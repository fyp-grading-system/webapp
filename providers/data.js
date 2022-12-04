import { PrintOutlined } from "@mui/icons-material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, createContext, useEffect, useState } from "react";

const Data = createContext();

const useData = () => {
  const [teams, setTeams] = useState();
  const [isTeamsLoading, setIsTeamsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [topics, setTopics] = useState();
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const { data: session } = useSession();

  const fetchTeams = async () => {
    setIsTeamsLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TEAM_BASE_URL}/teams`
    );
    setTeams(data);
    setIsTeamsLoading(false);
    data.forEach((t) => getTeamGrades(t.id));
  };

  const fetchTopics = async () => {
    setIsTopicsLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TOPIC_BASE_URL}/topics`
    );
    setTopics(data);
    setIsTopicsLoading(false);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercentage(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    setUploadPercentage(0);
    setIsUploading(true);
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERIALIZE_BASE_URL}/serialize`,
      formData,
      config
    );
    setIsUploading(false);
    setUploadPercentage(0);
    setIsTeamsLoading(true);
    setTimeout(fetchTeams, 500);
  };

  const createTopic = async (topic) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_TOPIC_BASE_URL}/topics/create`,
      topic
    );
    fetchTopics();
  };

  const deleteTopic = async (id) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_TOPIC_BASE_URL}/topics/delete/${id}`
    );
    fetchTopics();
  };

  const submitTeamGrades = async (grades, teamId) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_TOPIC_BASE_URL}/team-grades/create`,
      {
        teamId,
        juryId: session.user.id,
        grades,
      }
    );
    fetchTeams();
  };

  const getTeamGrades = async (teamId) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TOPIC_BASE_URL}/team-grades/${teamId}`
    );
    setTeams((oldTeams) => {
      const newTeams = [...oldTeams];
      const index = newTeams.findIndex((team) => team.id == data.teamId);
      const team = newTeams[index];

      if (team) {
        team.grades = data.grades;
        newTeams.splice(index, 1, team);
      }
      return newTeams;
    });
  };

  const deleteTeam = async (id) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_TEAM_BASE_URL}/teams/delete/${id}`
    );
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
    fetchTopics();
  }, []);

  return {
    teams,
    isTeamsLoading,
    isUploading,
    uploadPercentage,
    uploadFile,
    topics,
    isTopicsLoading,
    createTopic,
    deleteTopic,
    submitTeamGrades,
    deleteTeam,
  };
};
export const DataProvider = ({ children }) => {
  const data = useData();
  return <Data.Provider value={data}>{children}</Data.Provider>;
};

export const useCommonData = () => {
  const dataContext = useContext(Data);
  if (dataContext === undefined) {
    throw "useData must be used inside DataProvider";
  }
  return dataContext;
};
