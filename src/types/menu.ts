// src/types/menu.ts

// 基础菜单项接口 - 包含共有属性
interface BaseMenuItem {
	id: number;
	name: string;
	type: number; // 1=顶级菜单，2=子菜单，3=操作权限
	url: string | null;
	sort: number | null;
}

// 顶级菜单接口 - type=1
interface TopLevelMenuItem extends BaseMenuItem {
	type: 1;
	icon: string; // 菜单图标
	children: SubMenuItem[] | null;
}

// 子菜单接口 - type=2
interface SubMenuItem extends BaseMenuItem {
	type: 2;
	parentId: number; // 父菜单ID
	children: PermissionMenuItem[] | null;
}

// 权限操作接口 - type=3
interface PermissionMenuItem extends BaseMenuItem {
	type: 3;
	parentId: number; // 父菜单ID
	permission: string; // 权限标识符
	children?: null; // 权限项不应有子菜单
}

// 菜单项联合类型 - 任何类型的菜单项
type MenuItem = TopLevelMenuItem | SubMenuItem | PermissionMenuItem;

// 完整菜单树类型
type MenuTree = TopLevelMenuItem[];

// 用于Pinia store中的类型
interface UserMenuState {
	userMenus: MenuTree;
}

export {
	BaseMenuItem,
	TopLevelMenuItem,
	SubMenuItem,
	PermissionMenuItem,
	MenuItem,
	MenuTree,
	UserMenuState
};
