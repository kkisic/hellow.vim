import { main } from "https://deno.land/x/denops_std@v0.8/mod.ts";

main(async ({ vim }) => {
  vim.register({
    async hellow(): Promise<void> {
      const undoFlag = await vim.g.get("hellow_undo_enable")
      const undoLevels = await vim.eval("&undolevels");
      if (!undoFlag) {
        vim.execute('set undolevels=-1');
      }

      const line = await vim.call("line", "$");
      const targetLine = ((max: number) => {
        return Math.floor(Math.random() * max) + 1;
      })(line);
      vim.execute(`${targetLine}delete`);
      vim.execute(`set undolevels=${undoLevels}`);
    },
  });

  await vim.execute(`
    command! Hellow call denops#request('${vim.name}', 'hellow', [])
    noremap <silent> <Up> :<C-u>Hellow<CR>
    noremap <silent> <Down> :<C-u>Hellow<CR>
    noremap <silent> <Left> :<C-u>Hellow<CR>
    noremap <silent> <Right> :<C-u>Hellow<CR>
  `)
});
