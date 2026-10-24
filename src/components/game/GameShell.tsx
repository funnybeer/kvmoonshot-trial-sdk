import { GameFooter } from '@/components/game/GameFooter';
import { GameHeader } from '@/components/game/GameHeader';
import { PrepFlowBar } from '@/components/game/PrepFlowBar';

type Props = {
  children: React.ReactNode;
  header?: 'site' | 'hud';
  footer?: boolean;
  /** Operator → loadout → mission → download strip */
  prepFlow?: boolean;
};

export function GameShell({ children, header = 'site', footer = true, prepFlow = false }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-kv-bg text-kv-text">
      <GameHeader variant={header} />
      {prepFlow ? <PrepFlowBar /> : null}
      <main className="flex-1">{children}</main>
      {footer ? <GameFooter /> : null}
    </div>
  );
}
