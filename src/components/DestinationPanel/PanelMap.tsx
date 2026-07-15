import { useRef, useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import type { MapRef, MapEvent } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';
import type { Coordinates, Attraction } from '../../data/destinations';

interface Props {
  center: Coordinates;
  zoom: number;
  pitch?: number;
  bearing?: number;
  attractions: Attraction[];
  /** 'section' = inline with label & legend. 'background' = bare map, no chrome */
  variant?: 'section' | 'background';
}

export { type Coordinates, type Attraction };

/** Dark cinematic style — CartoDB light_all base + paint darkening.
 *  {ratio} → @2x on Retina (512px PNG), empty on 1× (256px PNG). */
export const DARK_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: 'raster' as const,
      tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{ratio}.png'],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    // Solid dark background so unloaded/bare areas match the brand palette
    {
      id: 'bg',
      type: 'background' as const,
      paint: { 'background-color': '#0a0a0f' },
    },
    {
      id: 'osm-layer',
      type: 'raster' as const,
      source: 'osm',
      paint: {
        'raster-brightness-min': 0,
        'raster-brightness-max': 0.7,
        'raster-saturation': 0.5,
        'raster-contrast': 0.5,
        'raster-opacity': 0.9,
      },
    },
  ],
};

const CATEGORY_COLORS: Record<Attraction['category'], string> = {
  '地标': '#C8884B',
  '自然': '#6BAF7B',
  '美食': '#E07B5A',
  '博物馆': '#7B9FC8',
  '寺庙': '#C8A87B',
  '观景点': '#C8884B',
  '活动': '#9B7BC8',
};

function AttractionMarkers({
  attractions,
  selectedId,
  onSelect,
}: {
  attractions: Attraction[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {attractions.map((a) => {
        const isSelected = selectedId === a.id;
        const color = CATEGORY_COLORS[a.category];

        return (
          <Marker
            key={a.id}
            longitude={a.coordinates.lng}
            latitude={a.coordinates.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onSelect(a.id);
            }}
          >
            <div
              className="relative flex flex-col items-center cursor-pointer group"
              style={{
                transition: 'transform 0.25s ease',
                transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                zIndex: isSelected ? 10 : 1,
              }}
            >
              {isSelected && (
                <div
                  className="absolute bottom-full mb-2 whitespace-nowrap px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span className="text-white/50 text-[10px] mr-1">
                    {a.category}
                  </span>
                  {a.name}
                  {a.rating && (
                    <span className="ml-1.5" style={{ color: '#C8884B' }}>
                      {'★'.repeat(a.rating)}
                    </span>
                  )}
                </div>
              )}

              <div
                className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: `2px solid ${color}`,
                  boxShadow: isSelected
                    ? `0 0 12px ${color}66`
                    : '0 0 0 transparent',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          </Marker>
        );
      })}
    </>
  );
}

export default function PanelMap({
  center,
  zoom,
  pitch = 0,
  bearing = 0,
  attractions,
  variant = 'section',
}: Props) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMapLoad = useCallback((_e: MapEvent) => {
    setMapLoaded(true);
  }, []);

  const handleMarkerClick = useCallback((attractionId: string) => {
    setSelectedId((prev) => (prev === attractionId ? null : attractionId));
  }, []);

  const isBg = variant === 'background';

  const mapElement = (
    <div
      className={isBg ? 'absolute inset-0' : 'relative w-full rounded-2xl overflow-hidden'}
      style={
        isBg
          ? undefined
          : {
              height: 'clamp(340px, 55vw, 520px)',
              border: '1px solid rgba(255,255,255,0.06)',
              background: '#0a0a0a',
            }
      }
    >
      {!mapLoaded && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: '#0a0a0a' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{
                borderColor: 'rgba(200,136,75,0.2)',
                borderTopColor: '#C8884B',
              }}
            />
          </div>
        </div>
      )}

      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom,
          pitch: isBg ? 0 : pitch,
          bearing: isBg ? 0 : bearing,
        }}
        mapStyle={DARK_STYLE}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
        maxPitch={isBg ? 0 : 65}
        minZoom={isBg ? zoom - 1 : 6}
        maxZoom={isBg ? zoom + 2 : 16}
        dragPan={!isBg}
        scrollZoom={!isBg}
        doubleClickZoom={!isBg}
        touchZoomRotate={!isBg}
        onLoad={handleMapLoad}
        interactive={!isBg}
      >
        {!isBg && (
          <NavigationControl position="top-right" showCompass={false} />
        )}

        <AttractionMarkers
          attractions={attractions}
          selectedId={selectedId}
          onSelect={handleMarkerClick}
        />

        {/* Destination center marker */}
        <Marker longitude={center.lng} latitude={center.lat} anchor="bottom">
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full flex items-center justify-center ${
                isBg ? 'w-10 h-10' : 'w-8 h-8'
              }`}
              style={{
                background: 'rgba(200,136,75,0.25)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '2px solid #C8884B',
                boxShadow: '0 0 20px rgba(200,136,75,0.3)',
              }}
            >
              <MapPin
                size={isBg ? 18 : 14}
                strokeWidth={2}
                style={{ color: '#C8884B' }}
              />
            </div>
            {!isBg && (
              <div
                className="absolute w-8 h-8 rounded-full animate-ping"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(200,136,75,0.4)',
                  animationDuration: '2.5s',
                }}
              />
            )}
          </div>
        </Marker>
      </Map>

      {/* Legend — only for section variant */}
      {!isBg && (
        <div
          className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-x-3 gap-y-1.5 px-3 py-2 rounded-lg text-[10px]"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.06)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {(
            ['地标', '自然', '美食', '寺庙', '博物馆', '观景点', '活动'] as const
          )
            .filter((cat) => attractions.some((a) => a.category === cat))
            .map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-1.5 text-white/55"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: CATEGORY_COLORS[cat] }}
                />
                {cat}
              </span>
            ))}
        </div>
      )}
    </div>
  );

  // Background variant: just the map, no wrapper
  if (isBg) return mapElement;

  // Section variant: wrapped with label and padding
  return (
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <p
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-4"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        探索地图
      </p>
      {mapElement}
    </div>
  );
}
