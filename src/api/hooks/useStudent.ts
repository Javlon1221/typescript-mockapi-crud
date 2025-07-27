import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const key = "students";

export const useStudent = () => {
    const client = useQueryClient();

    const getStudentsQuery = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await api.get("/Students");
            return res.data;
        },
    });

   const createStudents = useMutation({
    mutationFn: async (body: any) => {
        const res = await api.post("/Students", body); // 🔧 TO‘G‘RILANDI
        return res.data;
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [key] });
        },
    });


    const editStudents = useMutation({
        mutationFn: async (body: any) => {
            const res = await api.put(`/Students/${body.id}`, body);
            return res.data;
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [key] });
        },
    });

    const deleteStudents = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/Students/${id}`);
            return res.data;
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [key] });
        },
    });

    return {
        getStudentsQuery,
        createStudents,
        editStudents,
        deleteStudents,
    };
};
