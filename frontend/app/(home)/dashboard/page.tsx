"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Trash2, CheckCircle, Circle, Edit3, Plus, Search, Calendar } from 'lucide-react';
import { Todo } from '@/types/todo';

export default function DashboardPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, [search, statusFilter]);

    const fetchTodos = async () => {
        try {
            const response = await api.get(`/todos?search=${search}&status=${statusFilter}`);
            setTodos(response.data.todos);
        } catch (error) {
            toast.error('Failed to update task sequence');
        }
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        setLoading(true);

        try {
            if (editingId) {
                const current = todos.find(t => t.id === editingId);
                await api.put(`/todos/${editingId}`, { title, description, status: current?.status });
                toast.success('Task details updated');
                setEditingId(null);
            } else {
                await api.post('/todos', { title, description });
                toast.success('New task logged successfully');
            }
            setTitle('');
            setDescription('');
            fetchTodos();
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (todo: Todo) => {
        const nextStatus = todo.status === 'pending' ? 'completed' : 'pending';
        try {
            await api.put(`/todos/${todo.id}`, {
                title: todo.title,
                description: todo.description,
                status: nextStatus
            });
            fetchTodos();
        } catch (error) {
            toast.error('Status synchronization error');
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await api.delete(`/todos/${id}`);
            toast.success('Task removed securely');
            fetchTodos();
        } catch (error) {
            toast.error('Could not process deletion');
        }
    };

    const initEdit = (todo: Todo) => {
        setEditingId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description || '');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Creation/Adjustment Card Container */}
            <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-6 h-fit backdrop-blur-sm shadow-md">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    {editingId ? <Edit3 size={18} className="text-purple-400" /> : <Plus size={18} className="text-blue-400" />}
                    <span>{editingId ? 'Modify Task Details' : 'Create New Task'}</span>
                </h2>

                <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Task Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#0B0F19] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="E.g., Review architectural blueprint"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Context Notes</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#0B0F19] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Add auxiliary details..."
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-medium py-2 rounded-xl transition-all flex justify-center items-center gap-1.5 text-white shadow-sm ${editingId ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {editingId ? 'Update Record' : 'Commit Task'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setTitle(''); setDescription(''); }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 rounded-xl text-sm border border-slate-700/60 transition-colors"
                        >
                            Abort Edit
                        </button>
                    )}
                </form>
            </div>

            {/* Task Queue View Metrics and Controls */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Query entries via key terms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#111827]/50 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#111827]/50 border border-slate-800/80 p-2 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                        <option value="all">Display All Sequences</option>
                        <option value="pending">State: Pending</option>
                        <option value="completed">State: Completed</option>
                    </select>
                </div>

                {/* Dynamic Todo Queue Render Stack */}
                <div className="space-y-3">
                    {todos.length === 0 ? (
                        <div className="text-center border border-dashed border-slate-800 p-12 rounded-2xl">
                            <p className="text-slate-500 text-sm">No task matrices match selected constraints.</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex items-start justify-between p-4 bg-[#111827]/30 rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all shadow-sm ${todo.status === 'completed' ? 'opacity-60' : ''}`}
                            >
                                <div className="flex gap-4">
                                    <button onClick={() => toggleStatus(todo)} className="mt-1 text-slate-500 hover:text-blue-400 transition-colors focus:outline-none">
                                        {todo.status === 'completed' ? <CheckCircle className="text-emerald-500" size={20} /> : <Circle size={20} />}
                                    </button>
                                    <div>
                                        <h3 className={`font-semibold text-white ${todo.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p className={`text-sm text-slate-400 mt-1 whitespace-pre-line ${todo.status === 'completed' ? 'line-through text-slate-600' : ''}`}>
                                                {todo.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs mt-3">
                                            <Calendar size={12} />
                                            <span>{new Date(todo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1 ml-4">
                                    <button onClick={() => initEdit(todo)} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors">
                                        <Edit3 size={16} />
                                    </button>
                                    <button onClick={() => deleteTodo(todo.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}