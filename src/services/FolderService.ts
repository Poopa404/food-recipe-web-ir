import type {Folder} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getFolders(): Promise<AxiosResponse<Folder[]>> {
        return apiClient.get<Folder[]>('/folder?_limit=' + 24 + '&_page=' + 1)
    },
    getFoldersPage(perPage: number, page: number): Promise<AxiosResponse<Folder[]>> {
        return apiClient.get<Folder[]>('/folder?_limit=' + perPage + '&_page=' + page)
    },
    getFoldersById(id: number): Promise<AxiosResponse<Folder>> {
        return apiClient.get<Folder>('/folder/' + id.toString())
    },
    getFoldersByUIDPage(uid: number, perPage: number, page: number): Promise<AxiosResponse<Folder[]>> {
        return apiClient.get<Folder[]>('/folder?uid=' + uid + '&_limit=' + perPage + '&_page=' + page)
    },
    getFoldersByUID(uid: number): Promise<AxiosResponse<Folder[]>> {
        return apiClient.get<Folder[]>('/folder?uid=' + uid + '&_limit=' + 24 + '&_page=' + 1)
    },
    saveFolder(folder: Folder): Promise<AxiosResponse<Folder>> {
        console.log(folder)
        return apiClient.post<Folder>('/folder', folder)
    },
    deleteFolder(id: number): Promise<AxiosResponse> {
        return apiClient.post('/folder/delete/'+id.toString())
    },
}