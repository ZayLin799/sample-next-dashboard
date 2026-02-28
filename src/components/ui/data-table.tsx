"use client";

import React, { ReactNode } from "react";
import { Search, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export interface DataTableColumn<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    isLoading?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    onRefresh?: () => void;
    emptyMessage?: string;
    showSearch?: boolean;
    showPagination?: boolean;
    showRefresh?: boolean;
}

export function DataTable<T extends { _id?: string; id?: string }>({
    columns,
    data,
    isLoading = false,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    pageSize = 10,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100, 500, 1000, 5000, 10000],
    currentPage = 1,
    totalPages = 1,
    totalItems,
    onPageChange,
    onRefresh,
    emptyMessage = "No data found.",
    showSearch = true,
    showPagination = true,
    showRefresh = true,
}: DataTableProps<T>) {
    const displayTotalItems = totalItems ?? data.length;

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            {(showSearch || showRefresh) && (
                <div className="flex items-center gap-3">
                    {showSearch && onSearchChange && (
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a9099]" />
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-10 bg-white border-[#dce3ea] focus:border-[#3c8ef7] focus:ring-[#3c8ef7]"
                            />
                        </div>
                    )}
                    {showRefresh && onRefresh && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-[#dce3ea] hover:bg-[#f5f8fa]"
                            onClick={onRefresh}
                        >
                            <RefreshCw className="h-4 w-4 text-[#6b7280]" />
                        </Button>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="rounded-lg border border-[#dce3ea] bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#f8fafb] border-b border-[#dce3ea] hover:bg-[#f8fafb]">
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={`font-semibold text-[#3c8ef7] h-12 ${column.className || ""}`}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length > 0 ? (
                            data.map((item, index) => {
                                const itemId = item._id || item.id || String(index);
                                return (
                                    <TableRow
                                        key={itemId}
                                        className="border-b border-[#e5ebf1] hover:bg-[#f8fafb]"
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                className={column.className}
                                            >
                                                {column.render
                                                    ? column.render(item)
                                                    : String((item as any)[column.key] || "-")}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-[#6b7280]"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {showPagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <span>Show</span>
                        {onPageSizeChange ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-8 px-3 border-[#dce3ea] hover:bg-[#f5f8fa] font-medium"
                                    >
                                        {pageSize}
                                        <ChevronDown className="ml-2 h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {pageSizeOptions.map((size) => (
                                        <DropdownMenuItem
                                            key={size}
                                            onClick={() => onPageSizeChange(size)}
                                            className={pageSize === size ? "bg-[#e9f1ff]" : ""}
                                        >
                                            {size}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <span className="font-medium">{pageSize}</span>
                        )}
                        <span>
                            | 1-{data.length} of {displayTotalItems}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#dce3ea]"
                            disabled={currentPage === 1}
                            onClick={() => onPageChange?.(currentPage - 1)}
                        >
                            ‹
                        </Button>
                        <Button
                            variant="default"
                            size="icon"
                            className="h-8 w-8 bg-[#3c8ef7] hover:bg-[#2563eb]"
                        >
                            {currentPage}
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#dce3ea]"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange?.(currentPage + 1)}
                        >
                            ›
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#dce3ea]"
                        >
                            ⋮
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
