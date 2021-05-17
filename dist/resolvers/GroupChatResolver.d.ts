import { createGroupChatInput } from "../inputs";
export declare class GroupChatResolver {
    pageSize: number;
    getAllGroupChatIds(): Promise<{
        groupChats: any[];
    }>;
    getGroupChats(page?: number): Promise<{
        groupChats: import("../database/schema").IGroupChat[];
        totalPages: number;
        pageNumber: number;
    }>;
    getGroupChatByStatus(status: string): Promise<import("../database/schema").IGroupChat[]>;
    getGroupChat(id: string): Promise<import("../database/schema").IGroupChat | null>;
    searchGroupChats(text?: string, type?: Boolean, page?: number): Promise<{
        groupChats: import("../database/schema").IGroupChat[];
        totalPages: number;
        pageNumber: number;
    }>;
    addGroupChat(email: string, groupchatInfo: createGroupChatInput): Promise<import("../database/schema").IGroupChat | null>;
    updateGroupChat(id: string, status: string): Promise<import("../database/schema").IGroupChat | null>;
}
