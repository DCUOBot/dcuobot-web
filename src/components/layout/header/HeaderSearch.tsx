import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useNavigate } from '@tanstack/react-router';

const searchSchema = z.object({
  searchType: z.enum(['character', 'league']),
  server: z.enum(['2', '4', '10', '11', '5001']),
  query: z.string().min(1),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function HeaderSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, register, handleSubmit } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchType: 'character',
      server: '2',
      query: '',
    },
  });

  const onSubmit = (values: SearchFormValues) => {
    void navigate({
      to: values.searchType === 'character' ? '/characters' : '/leagues',
      search: {
        worldId: Number(values.server),
        query: values.query.trim(),
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 items-center rounded-full border bg-muted/40 px-2"
    >
      <Controller
        control={control}
        name="searchType"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            aria-label={t('header.search.type.ariaLabel')}
            placeholder={t('header.search.type.placeholder')}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="character">{t('header.search.type.values.character')}</SelectItem>
                <SelectItem id="league">{t('header.search.type.values.league')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="server"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            aria-label={t('header.search.server.ariaLabel')}
            placeholder={t('header.search.server.placeholder')}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="2">{t('header.search.server.values.usPcPs')}</SelectItem>
                <SelectItem id="4">{t('header.search.server.values.euPcPs')}</SelectItem>
                <SelectItem id="10">{t('header.search.server.values.usSwitch')}</SelectItem>
                <SelectItem id="11">{t('header.search.server.values.euSwitch')}</SelectItem>
                <SelectItem id="5001">{t('header.search.server.values.xbox')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Input
        placeholder={t('header.search.query.placeholder')}
        aria-label={t('header.search.query.ariaLabel')}
        className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
        {...register('query')}
      />
    </form>
  );
}
